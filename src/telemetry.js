/*instrumentation.js*/
// Require dependencies
const { NodeSDK } = require('@opentelemetry/sdk-node');
const {
  OTLPTraceExporter,
} = require('@opentelemetry/exporter-trace-otlp-proto');
const { resourceFromAttributes } = require('@opentelemetry/resources');
const { SEMRESATTRS_SERVICE_NAME, SEMRESATTRS_SERVICE_VERSION } = require('@opentelemetry/semantic-conventions');


const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');


const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ SEMRESATTRS_SERVICE_NAME ]: "error-testing-app",
    [ SEMRESATTRS_SERVICE_VERSION ]: "1.0",
  }),
  traceExporter: new OTLPTraceExporter({
    url: 'https://local.dev.obs.ninetech.dev/v1/traces',
    headers: {},
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
