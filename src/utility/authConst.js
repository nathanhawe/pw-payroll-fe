export const IDENTITY_CONFIG = {
	authority: process.env.REACT_APP_IDENTITY_URL,
	client_id: "timeandattendance",
	response_type: "code",
	scope: "openid profile timeandattendanceapi",
	redirect_uri: `${process.env.REACT_APP_URL}/signin-oidc`,
	post_logout_redirect_uri: `${process.env.REACT_APP_URL}/signout-callback-oidc`,
};
