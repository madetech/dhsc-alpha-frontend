import React, { useCallback, useState } from 'react';
import * as GovUK from 'govuk-react';
import Layout from '../../../components/layout/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import './emailVerificationPage.css';

export const validateIsCorrectEmail: (value?: string) => string | undefined = (
    value
) => (value ? undefined : 'Please let us know if this is the correct email');

function isNotEmpty(obj: any) {
    return Object.keys(obj).some((key) => obj[key]?.length > 0);
}

const EmailVerification: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [isCorrectEmail, setIsCorrectEmail] = useState<string>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState<{
        isCorrectEmail?: string;
    }>({});

    const handleSubmit = useCallback(() => {
        if (isSubmitting) return;

        const newErrors = {
            isCorrectEmail: validateIsCorrectEmail(isCorrectEmail),
        };

        if (isNotEmpty(newErrors)) {
            setErrors(newErrors);
        } else {
            setIsSubmitting(true);
            setTimeout(() => {
                setErrors({});
                setHasSubmitted(true);
                setIsSubmitting(false);
            }, 1000);
            navigate('/registration/create-password');
        }
    }, [isSubmitting, isCorrectEmail]);

    return (
        <Layout>
            <section>
                <GovUK.H2>Is your email address correct?</GovUK.H2>
                <GovUK.H6>{state}</GovUK.H6>
                {!hasSubmitted && (
                    <GovUK.LoadingBox loading={isSubmitting}>
                        <GovUK.Fieldset>
                            <GovUK.MultiChoice
                                mb={6}
                                className="radio-multi-choice"
                                label="Your email address needs to be correct to make sure you're authenticated correctly."
                                meta={{
                                    error: errors?.isCorrectEmail,
                                    touched: !!errors?.isCorrectEmail,
                                }}
                            >
                                <GovUK.Radio
                                    name="isCorrectEmail"
                                    inline
                                    checked={isCorrectEmail === 'yes'}
                                    onChange={() => setIsCorrectEmail('yes')}
                                >
                                    Yes
                                </GovUK.Radio>

                                <GovUK.Radio
                                    name="isCorrectEmail"
                                    inline
                                    checked={isCorrectEmail === 'no'}
                                    onChange={() => setIsCorrectEmail('no')}
                                >
                                    No
                                </GovUK.Radio>
                            </GovUK.MultiChoice>
                        </GovUK.Fieldset>
                        <GovUK.Button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            Continue
                        </GovUK.Button>
                    </GovUK.LoadingBox>
                )}
            </section>
        </Layout>
    );
};

export default EmailVerification;
