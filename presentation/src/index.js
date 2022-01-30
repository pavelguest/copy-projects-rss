import Reveal from "reveal.js";
import RevealMarkdown from "reveal.js/plugin/markdown/markdown.js";
import RevealHighlight from "reveal.js/plugin/highlight/highlight.js";
import RevealNotes from "reveal.js/plugin/notes/notes.js";
import "reveal.js/dist/reset.css";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import "reveal.js/plugin/highlight/monokai.css";
import "./style.css";

Reveal.initialize({
  hash: true,
  plugins: [RevealMarkdown, RevealHighlight, RevealNotes],
});
