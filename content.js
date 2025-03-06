(function() {
  const keywords = ["anti spiral", "anti viral", "anti", "spiral", "viral", "spirals", "antis", "virals", "ban anti"];

  function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function filterComments() {
    const commentNodes = document.querySelectorAll("#content-text");
    commentNodes.forEach(commentNode => {
      const normalizedComment = normalizeText(commentNode.textContent);
      if (keywords.some(keyword => normalizedComment.includes(keyword))) {
        
        const commentContainer = commentNode.closest("ytd-comment-thread-renderer");
        if (commentContainer) {
          commentContainer.style.display = "none";
        }
      }
    });
  }

  
  filterComments();

  
  const observer = new MutationObserver(mutations => {
    mutations.forEach(() => {
      filterComments();
    });
  });

  
  observer.observe(document.body, { childList: true, subtree: true });
})();
