import process from 'node:process';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';

if (!process.env.OTEL_EXPORTER_OTLP_ENDPOINT) {
  process.env.OTEL_EXPORTER_OTLP_ENDPOINT = 'http://localhost:4317';
}

const sdk = new NodeSDK({
  serviceName: 'ecommerce-api',
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT
  }),
  instrumentations: [getNodeAutoInstrumentations()]
});

try {
  await sdk.start();
  console.log(
    `[otel] Tracing enabled. Exporting spans to ${process.env.OTEL_EXPORTER_OTLP_ENDPOINT}`
  );
} catch (error) {
  console.error('[otel] Failed to initialize OpenTelemetry SDK:', error);
}

const shutdown = async () => {
  try {
    await sdk.shutdown();
    console.log('[otel] SDK shutdown complete');
  } catch (error) {
    console.error('[otel] Error shutting down SDK:', error);
  }
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
