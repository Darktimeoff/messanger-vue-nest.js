export function scrollListToBottom(scrollElm: HTMLDivElement) {
    const scrollHeight = scrollElm.scrollHeight;
    const height = scrollElm.clientHeight;
    const haveScroll = Boolean(height !== scrollHeight)
  
    if(!haveScroll) return;
    console.log('scrollListToBottom', scrollHeight)
    scrollElm.scrollTo(0, scrollHeight + 1000);
}
