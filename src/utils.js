import Scanner from './Scanner.js'

export const parseTemplateToTokens = function () {
  const scanner = new Scanner(templateStr)

  const words = []
  while (!scanner.eos()) {
    let word = scanner.scanUtil('{{')
    if (word) {
      words.push(['text', word])
    }
    // 跳过开始标识
    scanner.sacn('{{')
    word = scanner.scanUtil('}}')

    if (word) {
      if (word[0] === '#' || word[0] === '/') {
        words.push([word[0], word.substring(1)])
      } else {
        words.push(['name', word])
      }
    }

    // 跳过结束标识
    scanner.sacn('}}')
  }

  return nestedTokens(words)
}

const nestedTokens = function (tokens) {
  const nestedTokens = []
  const sections = []
  let collector = nestedTokens

  tokens.forEach((token) => {
    switch (token[0]) {
      case '#':
        sections.push(token)
        collector.push(token)
        collector = token[2] = []
        break
      case '/':
        sections.pop()
        collector =
          sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens
        break
      default:
        collector.push(token)
    }
  })

  return nestedTokens
}

export const renderTemplate = function (tokens, data) {
  let domStr = ''
  tokens.forEach((token) => {
    switch (token[0]) {
      case 'text':
        domStr += token[1]
        break
      case 'name':
        domStr += lookup(data,token[1])
        break
      case '#':
        break
    }
  })

  return domStr
}

const lookup = function (data, key) {
  let value
  if (!data) {
    return
  }

  if (key && key.includes('.') && key[0] !== '.') {
    const keys = key.split('.')
    value = data
    keys.forEach((newKey) => {
      value = value && value[newKey]
    })
    return value
  } else {
    return data[key]
  }
}
