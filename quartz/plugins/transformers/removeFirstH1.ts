import { QuartzTransformerPlugin } from "../types"

const removeFirstH1FromFirstNonBlankLine = (src: string): string => {
  const lines = src.split("\n")
  let startIndex = 0

  // Check if the content starts with frontmatter
  if (lines.length > 0 && lines[0].trim() === "---") {
    // Find the closing frontmatter delimiter
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === "---") {
        startIndex = i + 1 // Start searching after the closing delimiter
        break
      }
    }
  }

  // Find the first non-blank line after frontmatter
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i]

    // Skip blank lines (empty or only whitespace)
    if (line.trim() === "") {
      continue
    }

    // Check if this first non-blank line is an h1
    if (line.trim().startsWith("# ")) {
      // Remove this line
      lines.splice(i, 1)
    }
    return lines.join("\n")
  }

  // No non-blank lines found after frontmatter, return original
  return src
}

export const RemoveFirstH1: QuartzTransformerPlugin = () => {
  return {
    name: "Remove first h1",
    textTransform: (_ctx, src) => {
      return removeFirstH1FromFirstNonBlankLine(src)
    },
  }
}
