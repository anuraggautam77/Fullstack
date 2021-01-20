export const LOGGED_IN = 'Logged in';
export const LOGGED_OUT = 'Logged out';
export const LOGIN_ERROR = 'Login error';
export const LOGIN_CANCELLED = 'Login cancelled';
export function getCookie(cname: String) {
	var name = cname + '=';
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}
