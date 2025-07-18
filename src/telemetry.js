/*instrumentation.js*/
// Require dependencies
const { NodeSDK } = require('@opentelemetry/sdk-node');
const {
  OTLPTraceExporter,
} = require('@opentelemetry/exporter-trace-otlp-proto');
const { resourceFromAttributes } = require('@opentelemetry/resources');
const { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } = require('@opentelemetry/semantic-conventions');


const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');


const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ ATTR_SERVICE_NAME ]: "error-testing-app",
    [ ATTR_SERVICE_VERSION ]: "1.0",
  }),
  traceExporter: new OTLPTraceExporter({
    url: 'https://local.dev.obs.ninetech.dev/v1/traces',
    headers: {},
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
