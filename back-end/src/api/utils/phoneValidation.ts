import twilio from 'twilio';

const validatePhoneNumber = async(phNumber: string): Promise<boolean> => {
    if (!phNumber) {
        return false
    }else {
        const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
        try {
            client.lookups.v1.phoneNumbers(phNumber).fetch();
            return true
        } catch (error) {
            // console.log(error);
            return false
        }
    }
}

export default validatePhoneNumber
