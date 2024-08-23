import React, { useCallback, useState } from 'react';
import * as GovUK from 'govuk-react';
import Layout from '../../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';

const validateEmailAddress: (value?: string) => string | undefined = (value) =>
    value ? undefined : 'Please enter your email address';

function isNotEmpty(obj: any) {
    return Object.keys(obj).some((key) => obj[key]?.length > 0);
}

const EmailAddressPage: React.FC = () => {
    const navigate = useNavigate();

    const [emailAddress, setEmailAddress] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState<{
        emailAddress?: string;
    }>({});

    const handleSubmit = useCallback(() => {
        if (isSubmitting) return;

        const newErrors = {
            emailAddress: validateEmailAddress(emailAddress),
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
            navigate('/registration/email-verification', {
                state: emailAddress,
            });
        }
    }, [isSubmitting, emailAddress]);

    return (
        <Layout>
            <section>
                <GovUK.H2>What is your email address?</GovUK.H2>
                <GovUK.Paragraph>
                    You&apos;ll need this email address to sign in to your
                    account.
                </GovUK.Paragraph>
                {!hasSubmitted && (
                    <GovUK.LoadingBox loading={isSubmitting}>
                        <GovUK.Fieldset>
                            <GovUK.Label mb={6} error={!!errors?.emailAddress}>
                                <GovUK.LabelText>Email address</GovUK.LabelText>
                                {errors?.emailAddress && (
                                    <GovUK.ErrorText>
                                        {errors.emailAddress}
                                    </GovUK.ErrorText>
                                )}
                                <GovUK.Input
                                    name="emailAddress"
                                    style={{ width: '40%' }}
                                    onChange={(e: any) =>
                                        setEmailAddress(e.target.value)
                                    }
                                    value={emailAddress}
                                    error={!!errors?.emailAddress}
                                />
                            </GovUK.Label>
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

export default EmailAddressPage;
