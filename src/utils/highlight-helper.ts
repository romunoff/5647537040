export const highlightText = () => {
  const selection = window.getSelection()?.getRangeAt(0);
  const selectedText = selection?.extractContents();
  const element = document.createElement('span');
  element.style.backgroundColor = 'yellow';
  selectedText && element.appendChild(selectedText);
  selection?.insertNode(element);
};
