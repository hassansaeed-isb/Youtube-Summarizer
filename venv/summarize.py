from flask import Flask, request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer
from flask_cors import CORS
from textblob import TextBlob
import re  
app = Flask(__name__)
CORS(app, resources={r"/summarize": {"origins": "http://localhost:3000"}, r"/analyze_sentiment": {"origins": "http://localhost:3000"}})

@app.route('/')
def index():
    return 'Welcome to the YouTube Summarizer App!'

def extract_video_id(url):
    """Extracts video ID from YouTube URL."""
    pattern = r'(?:https?://)?(?:www\.)?(?:youtube\.com/watch\?v=|youtu\.be/)([^"&?/\s]{11})'
    match = re.search(pattern, url)
    return match.group(1) if match else None

@app.route('/summarize', methods=['POST'])
def summarize():
    video_id = request.json['videoId']
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        text = ' '.join([t['text'] for t in transcript])

        parser = PlaintextParser.from_string(text, Tokenizer('english'))
        summarizer = LsaSummarizer()
        summary = summarizer(parser.document, 5)  # Summarize to 5 sentences
        summarized_text = ' '.join(str(sentence) for sentence in summary)

        return jsonify({"summary": summarized_text}), 200
    except NoTranscriptFound:
        return jsonify({"error": "No transcript found for this video."}), 404
    except Exception as e:
        return jsonify({"error": "An error occurred: " + str(e)}), 500

def interpret_sentiment(polarity, subjectivity):
    """ Interpret the polarity and subjectivity into more human-readable form. """
    if polarity > 0.5:
        sentiment_desc = "Highly Positive"
    elif polarity > 0:
        sentiment_desc = "Positive"
    elif polarity < -0.5:
        sentiment_desc = "Highly Negative"
    elif polarity < 0:
        sentiment_desc = "Negative"
    else:
        sentiment_desc = "Neutral"
    
    if subjectivity > 0.75:
        subjectivity_desc = "Highly Subjective"
    elif subjectivity > 0.5:
        subjectivity_desc = "Somewhat Subjective"
    elif subjectivity > 0.25:
        subjectivity_desc = "Somewhat Objective"
    else:
        subjectivity_desc = "Highly Objective"

    return sentiment_desc, subjectivity_desc




@app.route('/analyze_sentiment', methods=['POST'])
def analyze_sentiment():
    print("Received data:", request.json)  # Log the received JSON data
    url = request.json.get('url')
    if not url:
        return jsonify({"error": "No URL provided."}), 400

    video_id = extract_video_id(url)
    if not video_id:
        return jsonify({"error": "Invalid YouTube URL provided."}), 400

    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        text = ' '.join([t['text'] for t in transcript])
        parser = PlaintextParser.from_string(text, Tokenizer('english'))
        summarizer = LsaSummarizer()
        summary = summarizer(parser.document, 5)
        summarized_text = ' '.join(str(sentence) for sentence in summary)

        blob = TextBlob(summarized_text)
        sentiment = blob.sentiment
        sentiment_desc, subjectivity_desc = interpret_sentiment(sentiment.polarity, sentiment.subjectivity)
        print("Sentiment Analysis:", sentiment)  # Log the sentiment analysis results

        return jsonify({"summary": summarized_text, "sentiment": {"polarity": sentiment.polarity, "subjectivity": sentiment.subjectivity, "description": sentiment_desc, "subjectivity_description": subjectivity_desc}}), 200
    except NoTranscriptFound:
        return jsonify({"error": "No transcript found for this video."}), 404
    except Exception as e:
        print("Error:", str(e))  # Log any errors
        return jsonify({"error": "An error occurred: " + str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)