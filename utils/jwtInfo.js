export const jwtInfo = (token) => {
  if (!token) {
    return { userId: null, userRole: null };
  } else {
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('JWT token error, invalid JWT');
    }
    const decoded = atob(parts[1]);
    const jwtObject = JSON.parse(decoded);
    const userId = jwtObject.userId;
    const userRole = jwtObject.authorities[0].authority;
    return { userId, userRole };
  }
};
