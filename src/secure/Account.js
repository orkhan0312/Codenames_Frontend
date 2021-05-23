import Button from '../components/Button'

const Account = () => {
    return(
        <div className={"container accountpage"}>
            <img className={"userimg"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACKElEQVRYR8XXT6hNURTH8c+TfyUjJRMRISXCwISpCBmglFKKTPwpIlL+lBQjkYkyMCAZGMhEBhQmUuS9mCgDBhgykH/Reu2r3ukee+/nenfN7l1r/dZ373P2WvsM6LMN9Lm+fwGYg8X4hRd4M5rFjAZgCS5iVaPgA+zDYA1ILcBa3MLkliJfsBH3SiFqAObhGaZkxD8jdqnokdQA3MG6wpXFLm0qiS0FmIvXJYIpJl7MWXibyykF2IsLObGGfzcu53JKAUJoV06s4b+EPbmcUoCb2JITa/ivY1supxTgKrbnxBr+K9iZyykFOI5TObGG/wjO5nJKAVbiYU6s4V+BJ7mcUoBxeIkFOcHkj3YczSiO41+tFCBENuB2TjD51+BuSWwNQOidw6GM8BkcKykeMbUAEX8Ap7sMpBhER1PDym59B7AWoJM3A1vTc47/nuMGPpSuvBZgOhbiFT5misQMWJpmx1AOKLcDMYROpNVOwHdEg4nWHKvubHXoLEP0/x0Ynwo/QvSDx20gbQDx/+HUfCa1JH/Cu+SbiaktcQEZc+EgvjVjugFMxDVszm1fpT8a2XoE+B9rAsTvGDy9Lt4peB+r8aPtJdyP85Urqw2PmXKyG8C0dI9re5a1hdriv2I23jcbUcz72P6xsLgvxr1xRCdcjqdjUT190Ax/PzRfwpjfcfz+l8WRjDYe94th63YM52MRYgT30n6mr6YRt+tcJ+wlQFetvgP8Bn1QUiHDNIxAAAAAAElFTkSuQmCC"} alt="user"/>
            <h2>Username</h2>
            <label htmlFor="firstname"><b>First name &nbsp;</b></label>
            <input type="text" name="firstname" id={"firstname"} required/><br/><br/>

            <label htmlFor={"lastname"}><b>Last name &nbsp;</b></label>
            <input type={"text"} name={"lastname"} id={"lastname"} required/><br/><br/>

            <label htmlFor={"username"}><b>Username &nbsp;</b></label>
            <input type={"text"} name={"username"} id={"username"}/><br/><br/>

            <label htmlFor="email"><b>Email &nbsp;</b></label>
            <input type="text"  name="email" id={"email"} required/><br/><br/>

            <label htmlFor="psw"><b>Password &nbsp;</b></label>
            <input type="password" name="psw" id={"psw"} required/><br/><br/>


            <label>
            <input type="checkbox" checked="checked" name="remember" id={"news"}/>&nbsp; Keep me informed about new features and Codenames news.
            </label>

            <Button text={"Save"} width={100}/>
        </div>
    )
}
export default Account