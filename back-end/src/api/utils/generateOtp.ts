import otpGenerator from 'otp-generator';

export const otpGenerate = async () => {
    const otp = await otpGenerator.generate(6,
        {
            lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
        });
        return otp;
}

export default otpGenerate