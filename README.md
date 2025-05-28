# otel-node-app

This project is a simple Node.js application that provides an API endpoint with automatic instrumentation using OpenTelemetry. The application is designed to return a successful response 90% of the time and a random server error 10% of the time.

## Project Structure

```
otel-node-app
├── src
│   ├── app.js          # Entry point of the application
│   └── telemetry.js    # OpenTelemetry instrumentation setup
├── package.json        # NPM configuration file
├── .env                # Environment variable definitions
└── README.md           # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd otel-node-app
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory with the following content:
   ```
   OTEL_SERVICE_NAME='app-yourname'
   OTEL_EXPORTER_OTLP_ENDPOINT='local.dev.obs.ninetech.dev'
   OTEL_EXPORTER_OTLP_PROTOCOL='http/protobuf'
   ```

4. **Run the application:**
   ```
   npm start
   ```

## Usage

The application exposes a single API endpoint:

- **GET /api**: 
  - Returns a 200 response 90% of the time.
  - Returns a random 5xx error (from a predefined set of errors) 10% of the time.

## License

This project is licensed under the MIT License.