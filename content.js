(function() {
  // Define keywords to filter out
  const keywords = ["Anti spiral", "Anti viral", "Anti", "spiral", "viral", "spirals", "Antis", "virals"];

  // Function that checks all comment text nodes and hides the comment if it contains any of the keywords
  function filterComments() {
    // YouTube typically uses the element with id "content-text" for comment text
    const commentNodes = document.querySelectorAll("#content-text");
    commentNodes.forEach(commentNode => {
      const commentText = commentNode.textContent;
      if (keywords.some(keyword => commentText.includes(keyword))) {
        // Find the outer container for the comment
        const commentContainer = commentNode.closest("ytd-comment-thread-renderer");
        if (commentContainer) {
          commentContainer.style.display = "none";
        }
      }
    });
  }

  // Run filtering on initial page load
  filterComments();

  // Set up a MutationObserver to handle dynamically loaded comments
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length > 0) {
        filterComments();
      }
    });
  });

  // Start observing the document for changes
  observer.observe(document.body, { childList: true, subtree: true });
})();
