export const updateTitle = (): void => {
    setTimeout(() => {
        window.top.document.title = 'PX Blue | React Native Components';
    }, 10);
    (function() {
        var link = window.top.document.querySelector("link[rel*='icon']") || document.createElement('link');
        // @ts-ignore
        link.type = 'image/x-icon';
        // @ts-ignore
        link.rel = 'shortcut icon';
        // @ts-ignore
        link.href = './pxblue.png';
        window.top.document.getElementsByTagName('head')[0].appendChild(link);
    })();
};
