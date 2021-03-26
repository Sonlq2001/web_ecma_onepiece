
export const currentURL = () => {
    const currentURL = window.location.hash.toLowerCase();
    const handleCurrentURL = currentURL.split('/');
    return {
        resource: handleCurrentURL[1],
        id: handleCurrentURL[2]
    }
}

export const $ = selector => {
    const elements = document.querySelectorAll(selector);
    return elements.length == 1 ? elements[0] : [...elements];
}

// render 
export const resetRender = async (component, position, value) => {
    if(component && value && position){
        $(position).innerHTML = await component.render(value);
    } else if (component && position) {
        $(position).innerHTML = await component.render();
    } else {
        $('.main').innerHTML = await component.render();
    }
    await component.afterRender();
}

export const pagination = async (component, data, start, end) => {
    if(start && end && component){
        $('.main').innerHTML = await component.render(data, start, end);
    } else {
        $('.main').innerHTML = await component.render();
    }
    // await component.afterRender();
}

// handle cart

