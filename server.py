import openai
from flask import Flask, request, jsonify
from flask_cors import CORS

# Initialize OpenAI client (new API version)
client = openai.OpenAI(api_key="YOUR_OPENAI_API_KEY")

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/chat": {"origins": "*"}})  # Enable CORS

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        print("Received request:", data)  # Debugging

        messages = data.get("messages", [])
        response = client.chat.completions.create(  # New API format
            model="gpt-4o",
            messages=messages
        )

        return jsonify({"response": response.choices[0].message.content})

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=3000, debug=True)  # Ensure the correct port
