
const Footer = {
    async render () {
        return /*html*/ `
        <div class="container">
            <div class="row">
                <div class="col-12 col-md">
                <img class="mb-2" src="./images/logo.png" alt="" width="100px" height="40px">
                <small class="d-block mb-3 text-muted fs-5">&copy; sonel</small>
                </div>
                <div class="col-6 col-md">
                <h5 class="fs-3 title-footer mb-4">Features</h5>
                <ul class="list-unstyled text-small">
                    <li class="mb-2"><a class="link-secondary fs-4" href="#">Cool stuff</a></li>
                    <li class="mb-2"><a class="link-secondary fs-4" href="#">Random feature</a></li>
                    <li class="mb-2"><a class="link-secondary fs-4" href="#">Team feature</a></li>
                    <li class="mb-2"><a class="link-secondary fs-4" href="#">Stuff for developers</a></li>
                    <li class="mb-2"><a class="link-secondary fs-4" href="#">Another one</a></li>
                    <li class="mb-2"><a class="link-secondary fs-4" href="#">Last time</a></li>
                </ul>
                </div>
                <div class="col-6 col-md">
                <h5 class="fs-3 title-footer mb-4">Resources</h5>
                <ul class="list-unstyled text-small">
                    <li class="mb-2"><a class="link-secondary fs-4" href="#">Resource</a></li>
                    <li class="mb-2"><a class="link-secondary fs-4" href="#">Resource name</a></li>
                    <li class="mb-2"><a class="link-secondary fs-4" href="#">Another resource</a></li>
                    <li class="mb-2"><a class="link-secondary fs-4" href="#">Final resource</a></li>
                </ul>
                </div>
                <div class="col-6 col-md"> 
                <h5 class="fs-3 title-footer mb-4">About</h5>
                <ul class="list-unstyled text-small">
                    <li class="mb-2"><a class="link-secondary fs-4" href="#">Team</a></li>
                    <li class="mb-2"><a class="link-secondary fs-4" href="#">Locations</a></li>
                    <li class="mb-2"><a class="link-secondary fs-4" href="#">Privacy</a></li>
                    <li class="mb-2"><a class="link-secondary fs-4" href="#">Terms</a></li>
                </ul>
                </div>
            </div>
        </div>
        `;
    }
}

export default Footer;