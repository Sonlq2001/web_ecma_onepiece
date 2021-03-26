export const currentURL = () => {
    const currentURL = window.location.hash.toLowerCase();
    const response = currentURL.split('/');
    return {
        resource: response[1],
        id: response[2]
    }
}

export const $ = selector => {
    const elements = document.querySelectorAll(selector);
    return elements.length == 1 ? elements[0] : [...elements];
}

export const resetRender = async(component, position) => {
    if (position) {
        $(position).innerHTML = await component.render();
    } else {
        $('.main-content').innerHTML = await component.render();
    }
    await component.afterRender();
}