import React, { useCallback, useState } from 'react';
import * as GovUK from 'govuk-react';
import Layout from '../../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';

const validateFirstName: (value?: string) => string | undefined = (value) =>
    value ? undefined : 'Please enter a first name';

const validateLastName: (value?: string) => string | undefined = (value) =>
    value ? undefined : 'Please enter a last name';

function isNotEmpty(obj: any) {
    return Object.keys(obj).some((key) => obj[key]?.length > 0);
}

const FirstNameAndLastNamePage: React.FC = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState<{
        firstName?: string;
        lastName?: string;
    }>({});

    const handleSubmit = useCallback(() => {
        if (isSubmitting) return;

        const newErrors = {
            firstName: validateFirstName(firstName),
            lastName: validateLastName(lastName),
        };

        if (isNotEmpty(newErrors)) {
            setErrors(newErrors);
        } else {
            setIsSubmitting(true);
            setTimeout(() => {
                setErrors({
                    firstName: undefined,
                    lastName: undefined,
                });
                setHasSubmitted(true);
                setIsSubmitting(false);
            }, 1000);
            navigate('/registration/email');
        }
    }, [isSubmitting, firstName, lastName]);

    return (
        <>
            <Layout>
                <GovUK.H2>What is your name?</GovUK.H2>
                <GovUK.Paragraph>
                    You&apos;ll need to create an account to access most of the
                    Access Tools functionality
                </GovUK.Paragraph>
                {!hasSubmitted && (
                    <GovUK.LoadingBox loading={isSubmitting}>
                        <GovUK.Fieldset>
                            <GovUK.Label mb={6} error={!!errors?.firstName}>
                                <GovUK.LabelText>First name</GovUK.LabelText>
                                {errors?.firstName && (
                                    <GovUK.ErrorText>
                                        {errors.firstName}
                                    </GovUK.ErrorText>
                                )}
                                <GovUK.Input
                                    name="firstName"
                                    style={{ width: '40%' }}
                                    onChange={(e: any) =>
                                        setFirstName(e.target.value)
                                    }
                                    value={firstName}
                                    error={!!errors?.firstName}
                                />
                            </GovUK.Label>
                            <GovUK.Label mb={6} error={!!errors?.lastName}>
                                <GovUK.LabelText>Last name</GovUK.LabelText>
                                {errors?.lastName && (
                                    <GovUK.ErrorText>
                                        {errors.lastName}
                                    </GovUK.ErrorText>
                                )}
                                <GovUK.Input
                                    name="lastName"
                                    style={{ width: '40%' }}
                                    onChange={(e: any) =>
                                        setLastName(e.target.value)
                                    }
                                    value={lastName}
                                    error={!!errors?.lastName}
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
            </Layout>
        </>
    );
};

export default FirstNameAndLastNamePage;
