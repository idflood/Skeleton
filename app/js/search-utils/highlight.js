define(['jquery'], function () {

  return {
    highlightElement: highlightElement,
    getOriginalText : getOriginalText
  }

  function escapeRegexp(queryToEscape) {
    return ('' + queryToEscape).replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }

  function highlightElement ($el, searchQuery) {
    var oldText = getOriginalText($el);
    var newText = oldText.replace(
      new RegExp(escapeRegexp(searchQuery), 'gi'),
      '<span class="is-highlighted">$&</span>'
    );
    $el.data('highlight-old', oldText);
    $el.html(newText);
  }

  function getOriginalText ($el) {
    return $el.data('highlight-old') || $el.text()
  }
});
