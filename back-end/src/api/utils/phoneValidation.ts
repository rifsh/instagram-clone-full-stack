import twilio from 'twilio';

const validatePhoneNumber = (phNumber: string): boolean => {
    const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
    try {
        client.lookups.v1.phoneNumbers(phNumber).fetch();
        return true
    } catch (error) {
        return false
    }
}

export default validatePhoneNumber
