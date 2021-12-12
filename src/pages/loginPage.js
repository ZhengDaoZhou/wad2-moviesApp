import {
    Button,
    Form,
    Input,
    Toast
} from 'antd-mobile';
import {
    getAccount,
    login
} from '../api/tmdb-api'

function Login() {
    return (
        <div style={{ "width": "1000px", "margin": "30px auto" }}>
            <Form initialValues={{
                "username": "",
                "password": ""
            }} onFinish={(values) => {
                login(values).then(res => {
                    if (!res) {
                        Toast.show({
                            icon: 'error',
                            content: 'login fail!'
                        })
                    } else {
                        const { session_id } = res;
                        localStorage.setItem("session", session_id)
                        getAccount().then(res => {                           
                            localStorage.setItem("account", JSON.stringify(res))
                            localStorage.setItem("account_username", res.username)
                            localStorage.setItem("account_id", res.id)
                        })
                        Toast.show({
                            icon: "success",
                            content: "login success!"
                        })
                        localStorage.setItem("account_login", true)
                        window.location.reload()
                        window.location.href = "/"
                    }
                })
            }}>
                <Form.Item label={"Username"} name={"username"}>
                    <Input />
                </Form.Item>
                <Form.Item label={"Password"} name={"password"}>
                    <Input type="password"/>
                </Form.Item>
                <Form.Item>
                    <Button block color='primary' type='submit'>Login</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login;