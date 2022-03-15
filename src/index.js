import { parseTemplateToTokens } from './utils'

window.MyTemplateEngine = {
  render(templateStr,data){
    const tokens = parseTemplateToTokens(templateStr);
    console.log(tokens);
    return tokens;
  }
}