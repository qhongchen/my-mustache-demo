import { parseTemplateToTokens, renderTemplate } from './utils'

window.MyTemplateEngine = {
  render(templateStr, data) {
    const tokens = parseTemplateToTokens(templateStr)
    const domStr = renderTemplate(tokens, data)
    return domStr
  },
}
