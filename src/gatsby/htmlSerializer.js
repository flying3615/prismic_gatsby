const { RichText, Link } = require('prismic-dom')

// We don't want to import every PrismJS component - so that's why they're required individually
const Prism = require('prismjs')
require('prismjs/components/prism-javascript')
require('prismjs/components/prism-css')
require('prismjs/components/prism-scss')
require('prismjs/components/prism-jsx')
require('prismjs/components/prism-bash')
require('prismjs/components/prism-json')
require('prismjs/components/prism-diff')
require('prismjs/components/prism-markdown')
require('prismjs/components/prism-graphql')

const { Elements } = RichText

// Labels with this name will be inline code
const codeInline = ['text', 'javascript', 'css', 'scss', 'jsx', 'bash', 'json', 'diff', 'markdown', 'graphql']
// Labels with these names will become code blocks
const codeBlock = ['javascript', 'css', 'scss', 'jsx', 'bash', 'json', 'diff', 'markdown', 'graphql']

const htmlSerializer = (type, element, content) => {
  switch (type) {
    // First differentiate between a label and a preformatted field (e.g. the Code Block slice)
    case Elements.label: {
      // Use the inline code for labels that are in the array of "codeInline"
      if (codeInline.includes(element.data.label)) {
        return `<code class="language-${element.data.label}">${content}</code>`
      }
      // Use the blockquote for labels with the name "quote"
      if (element.data.label === 'quote') {
        return `<blockquote><p>${content}</p></blockquote>`
      }
      // Use the code block for labels that are in the array of "codeBlock"
      // Choose the right PrismJS highlighting with the label name
      if (codeBlock.includes(element.data.label)) {
        return `<pre class="language-${element.data.label}"><code class="language-${
          element.data.label
        }">${Prism.highlight(content, Prism.languages[element.label])}</code></pre>`
      }
      return null
    }
    case Elements.preformatted: {
      if (codeBlock.includes(element.label)) {
        return `<pre class="language-${element.label}"><code class="language-${element.label}">${Prism.highlight(
          element.text,
          Prism.languages[element.label]
        )}</code></pre>`
      }
      return null
    }
    case Elements.embed: {
      return `
        <div data-oembed="${element.oembed.embed_url}"
          data-oembed-type="${element.oembed.type}"
          data-oembed-provider="${element.oembed.provider_name}"
        >
          ${element.oembed.html}
        </div>
      `
    }
    case Elements.image: {
      const linkUrl = element.linkTo ? Link.url(element.linkTo, module.exports.linkResolver) : null
      const linkTarget =
        element.linkTo && element.linkTo.target ? `target="${element.linkTo.target}" rel="noopener"` : ''
      const wrapperClassList = [element.label || '', 'block-img']
      const img = `<img src="${element.url}" alt="${element.alt || ''}" copyright="${element.copyright || ''}">`
      return `
        <p class="${wrapperClassList.join(' ')}">
          ${linkUrl ? `<a ${linkTarget} href="${linkUrl}">${img}</a>` : img}
        </p>
      `
    }
    default: {
      return null
    }
  }
}

module.exports = htmlSerializer
