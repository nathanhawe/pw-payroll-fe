export const IDENTITY_CONFIG = {
	authority: "https://localhost:6001",
	client_id: "timeandattendance",
	response_type: "code",
	scope: "openid profile timeandattendanceapi",
	redirect_uri: "http://localhost:3000/signin-oidc",
	post_logout_redirect_uri: "http://localhost:3000/signout-callback-oidc",
};
