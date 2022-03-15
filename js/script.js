const colorForm = document.getElementById('color-form');
const colorContainer = document.getElementById('color-container');

//Function that handles form submit
const handleSubmit = (e) => {
    //Prevent Default Form Behavior
    e.preventDefault();

    //Get Form Data
    const formData = new FormData(e.target);
    const color = formData.get('color');
    const colorSchemeMode = formData.get('color-scheme-mode');

    //If form has color and color scheme mode, get color scheme.
    if (color && colorSchemeMode) {
        getColorScheme(color, colorSchemeMode);
    }


}

//Function that gets color scheme from API
const getColorScheme = (color, colorSchemeMode) => {
    const baseURL = 'https://www.thecolorapi.com/scheme';
    const hexColorClean = color.replaceAll('#', ''); //Remove hash tag from color value
    
    fetch(`${baseURL}?hex=${hexColorClean}&mode=${colorSchemeMode}&count=5`)
        .then(res => res.json())
        .then(data => {
            renderColorScheme(data.colors);
        })
}

//Function that renders HTML for colors
const renderColorScheme = (arr) => {
    const colorHTML = arr.map(a => {
        return `
            <div class="color">
                <div class="color-col" style="background:${a.hex.value}">
                </div>
                <input type="text" class="color-name" value="${a.hex.value}" disabled>
            </div>
        `
    }).join('')

    colorContainer.innerHTML = colorHTML;
}

//Event Listener for Form
colorForm.addEventListener('submit', handleSubmit);