'use strict'

var React = require('react')

function markIt (input, query) {
  var escaped = query.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
  var regex = RegExp(escaped, 'gi')

  return {
    __html: input.replace(regex, '<mark>$&</mark>')
  }
}

// backslashes must be escaped or they break the regex
function stringRegexCleanup (string) {
  var currentString = string,
      isPrevCharBackslash = false,
      prevBackslashPos,
      consecutiveBackslashCounter = 0,
      backslashPosition = string.indexOf('\\');

  while (backslashPosition !== -1) {
    currentString = currentString.replace('\\', '\\\\');
    backslashPosition = string.indexOf('\\', backslashPosition + 1);
  }

  return currentString;
}

function filterSuggestions (query, suggestions, length) {
  var regex;
  regex = new RegExp(("\\b" + stringRegexCleanup(query)), 'i');
  return suggestions.filter(function (item) { return item.id === -1 || item.id === 0 || regex.test(item.name) || regex.test(item.email); }).slice(0, length)
}

var Suggestions = (function (superclass) {
  function Suggestions (props) {
    superclass.call(this, props)

    this.state = {
      options: filterSuggestions(this.props.query, this.props.suggestions, this.props.maxSuggestionsLength)
    }
  }

  if ( superclass ) Suggestions.__proto__ = superclass;
  Suggestions.prototype = Object.create( superclass && superclass.prototype );
  Suggestions.prototype.constructor = Suggestions;

  Suggestions.prototype.componentWillReceiveProps = function componentWillReceiveProps (newProps) {
    this.setState({
      options: filterSuggestions(newProps.query, newProps.suggestions, newProps.maxSuggestionsLength)
    })
  };

  Suggestions.prototype.render = function render () {
    var this$1 = this;

    if (!this.props.expandable || !this.state.options.length) {
      return null
    }

    var options = this.state.options.map(function (item, i) {
      var key = (this$1.props.listboxId) + "-" + i
      var classNames = []

      if (this$1.props.selectedIndex === i) {
        classNames.push(this$1.props.classNames.suggestionActive)
      }

      if (item.disabled) {
        classNames.push(this$1.props.classNames.suggestionDisabled)
      }

      if (item.id === 0) {
        classNames.push('suggestion-invite-all');
        return (
          React.createElement( 'li', {
            id: key, key: key, role: 'option', className: classNames.join(' '), 'aria-disabled': item.disabled === true, onMouseDown: function () { return this$1.props.addTag(item); } },
            React.createElement('div', {},
              React.createElement( 'div', { className: 'suggestion-name' }, item.name)
            ),
            React.createElement( 'div', { className: 'suggestion-role' }, item.role)
          )
        )
      }

      if (item.id === -1) {
        classNames.push('suggestion-invite-custom');
        return (
          React.createElement( 'li', {
            id: key, key: key, role: 'option', className: classNames.join(' '), 'aria-disabled': item.disabled === true, onMouseDown: function () { return this$1.props.addTag(item); } },
            React.createElement('div', {},
              React.createElement( 'div', { className: 'suggestion-name' }, item.name + ' "' + this$1.props.query + '"')
            ),
            React.createElement( 'div', { className: 'suggestion-role' }, item.role)
          )
        )
      }

      return (
        React.createElement( 'li', {
          id: key, key: key, role: 'option', className: classNames.join(' '), 'aria-disabled': item.disabled === true, onMouseDown: function () { return this$1.props.addTag(item); } },
          React.createElement('div', {},
            React.createElement( 'div', { className: 'suggestion-name', dangerouslySetInnerHTML: markIt(item.name, this$1.props.query) }),
            React.createElement( 'div', { className: 'suggestion-email', dangerouslySetInnerHTML: markIt(item.email, this$1.props.query),
                                          style: { fontSize: '12px' } })
          ),
          React.createElement( 'div', { className: 'suggestion-role' }, item.role)
        )
      )
    })

    return (
      React.createElement( 'div', { className: this.props.classNames.suggestions },
        React.createElement( 'ul', { role: 'listbox', id: this.props.listboxId }, /* selectAll, */options)
      )
    )
  };

  return Suggestions;
}(React.Component));

module.exports = Suggestions
