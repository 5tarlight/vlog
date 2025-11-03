"use client";

import cytoscape, { ElementDefinition } from "cytoscape";
import { useEffect, useRef, useState } from "react";

export default function GraphRenderer({ code }: { code: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    const observer = new MutationObserver(() => checkDarkMode());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    checkDarkMode();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const lines = code.trim().split("\n");
    const edges: ElementDefinition[] = [];
    const nodesMap = new Map<string, ElementDefinition>();
    const allowedLayouts = [
      "cose",
      "grid",
      "circle",
      "breadthfirst",
      "concentric",
    ];
    let layoutName = "cose";

    function parseAttrs(attrText: string) {
      const attrs: Record<string, any> = {};
      const pairs = attrText.split(",").map((s) => s.trim());
      for (const pair of pairs) {
        const [key, value] = pair.split("=").map((s) => s.trim());
        if (key && value) attrs[key] = value;
      }
      return attrs;
    }

    for (const line of lines) {
      if (/^layout\s*=/.test(line)) {
        const rawName = line.split("=")[1].trim();
        layoutName = allowedLayouts.includes(rawName) ? rawName : "cose";
        continue;
      }

      const nodeMatch = line.match(/^node\s+(\w+)(?:\s*\[(.+)\])?$/);
      const edgeMatch = line.match(
        /^(\w+)\s*(<->|->|<-|-)?\s*(\w+)(?:\s+(-?\d+))?$/
      );

      if (edgeMatch) {
        const [, from, direction, to, weightText] = edgeMatch;
        const label = weightText ?? undefined;
        const weight = weightText ? parseFloat(weightText) : 1;

        if (!nodesMap.has(from))
          nodesMap.set(from, { data: { id: from }, style: {} });
        if (!nodesMap.has(to))
          nodesMap.set(to, { data: { id: to }, style: {} });

        const makeEdge = (
          src: string,
          tgt: string,
          idSuffix = "",
          arrow = true
        ) => ({
          data: {
            id: `${src}-${tgt}${idSuffix}`,
            source: src,
            target: tgt,
            label,
            weight,
          },
          classes: arrow ? "directed" : "undirected",
        });

        if (direction === "->") {
          edges.push(makeEdge(from, to));
        } else if (direction === "<-") {
          edges.push(makeEdge(to, from));
        } else if (direction === "<->") {
          edges.push(makeEdge(from, to, "-1"));
          edges.push(makeEdge(to, from, "-2"));
        } else if (direction === "-") {
          edges.push(makeEdge(from, to, "", false));
        }
      }

      if (nodeMatch) {
        const [, id, attrText] = nodeMatch;
        const data: any = { id, label: id };
        const style: any = {};
        if (attrText) {
          const attrs = parseAttrs(attrText);
          if (attrs.label) data.label = attrs.label;
          if (attrs.color) style["background-color"] = attrs.color;
          if (attrs.shape) style["shape"] = attrs.shape;
        }
        nodesMap.set(id, { data, style });
      }
    }

    const nodes = Array.from(nodesMap.values());

    const cy = cytoscape({
      container: containerRef.current,
      elements: [...nodes, ...edges],
      layout: { name: layoutName },
      userZoomingEnabled: false,
      style: [
        {
          selector: "node",
          style: {
            width: 20,
            height: 20,
            "background-color": isDarkMode ? "#242424" : "#ffffff",
            "border-color": isDarkMode ? "#ffffff" : "#000000",
            "border-width": 1,
            label: "data(id)",
            color: isDarkMode ? "#ffffff" : "#000000",
            "text-valign": "center",
            "text-halign": "center",
            shape: "ellipse",
            "font-size": 5,
            "text-outline-width": 0,
          },
        },
        {
          selector: "edge",
          style: {
            width: 1,
            "line-color": isDarkMode ? "#ffffff" : "#000000",
            "target-arrow-color": isDarkMode ? "#ffffff" : "#000000",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
            label: "data(label)",
            color: isDarkMode ? "#ffffff" : "#000000",
            "font-size": 4,
            "text-rotation": "autorotate",
            "text-margin-y": -6,
            "text-background-opacity": 1,
            "text-background-color": isDarkMode ? "#242424" : "#ffffff",
          },
        },
        {
          selector: "edge.undirected",
          style: {
            "target-arrow-shape": "none",
          },
        },
      ],
    });

    return () => {
      cy.destroy();
    };
  }, [code, isDarkMode]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "500px",
        border: "1px solid #eee",
        borderRadius: "8px",
        margin: "1rem 0",
      }}
    />
  );
}
