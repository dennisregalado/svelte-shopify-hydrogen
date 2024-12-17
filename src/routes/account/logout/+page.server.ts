export const actions = {
	logout: async ({ locals: { customerAccount } }) => {
		return customerAccount.logout();
	}
};
