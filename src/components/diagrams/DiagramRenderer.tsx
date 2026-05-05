import { MiddlewarePipeline } from './MiddlewarePipeline';
import { HttpLifecycle } from './HttpLifecycle';
import { LoadBalancing } from './LoadBalancing';
import { ProcessVsThread } from './ProcessVsThread';
import { DockerLayers } from './DockerLayers';
import { DIFlow } from './DIFlow';

interface DiagramRendererProps {
  diagramId?: string;
}

export function DiagramRenderer({ diagramId }: DiagramRendererProps) {
  if (!diagramId) return null;

  switch (diagramId) {
    case 'middleware-pipeline':
      return <MiddlewarePipeline />;
    case 'http-lifecycle':
      return <HttpLifecycle />;
    case 'load-balancing':
      return <LoadBalancing />;
    case 'process-vs-thread':
      return <ProcessVsThread />;
    case 'docker-layers':
      return <DockerLayers />;
    case 'di-flow':
      return <DIFlow />;
    default:
      return null;
  }
}
