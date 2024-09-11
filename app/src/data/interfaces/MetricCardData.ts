import { FunctionComponentElement } from "react";

export interface MetricCardData {
  title: string;
  svg: SVGSVGElement | null;
  description: string;
  sourceUrl: string;
  sourceLinkString: string;
  limitationDescription: string;
  component: FunctionComponentElement<any>;
}
