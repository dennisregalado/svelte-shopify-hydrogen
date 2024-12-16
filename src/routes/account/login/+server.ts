export const GET = async ({ locals: { customerAccount } }) => {
	return customerAccount.login();
};
