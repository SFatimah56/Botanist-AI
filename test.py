import unittest
import requests

class TestAPI(unittest.TestCase):
    BASE_URL = "Replace with your actual API URL"
    API_KEY = "your_api_key"

    def test_api_response(self):
        headers = {
            "Authorization": f"Bearer {self.API_KEY}",  # If using Bearer token auth
            "Content-Type": "application/json"
        }
        response = requests.get(self.BASE_URL, headers=headers)

        # Check if API returns 200 status
        self.assertEqual(response.status_code, 200, "API did not return a 200 status code")
        
        # Check if response is not empty
        self.assertTrue(response.json(), "API response is empty")

if __name__ == "__main__":
    unittest.main()
