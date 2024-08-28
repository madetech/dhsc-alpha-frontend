import * as GovUK from 'govuk-react';
import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const validateEmail: (value?: string) => string | undefined = (value) =>
    value ? undefined : 'Please enter a email address';

const validatePassword: (value?: string) => string | undefined = (value) =>
    value ? undefined : 'Please enter a password';

function isNotEmpty(obj: any) {
    return Object.keys(obj).some((key) => obj[key]?.length > 0);
}

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
    }>({});

    const handleSubmit = useCallback(() => {
        if (isSubmitting) return;

        const newErrors = {
            email: validateEmail(email),
            password: validatePassword(password),
        };

        if (isNotEmpty(newErrors)) {
            setErrors(newErrors);
        } else {
            setIsSubmitting(true);
            setTimeout(() => {
                setErrors({
                    email: undefined,
                    password: undefined,
                });
                setHasSubmitted(true);
                setIsSubmitting(false);
            }, 1000);
            sessionStorage.setItem('isLoggedIn', 'true');
            navigate('/home');
        }
    }, [isSubmitting, email, password]);

    return (
        <>
            <Layout>
                <GovUK.H2>Sign in</GovUK.H2>
                <GovUK.Paragraph>
                    Sign in or [create an account](./) to get started.
                </GovUK.Paragraph>
                {!hasSubmitted && (
                    <GovUK.LoadingBox loading={isSubmitting}>
                        <GovUK.Fieldset>
                            <GovUK.Label mb={6} error={!!errors?.email}>
                                <GovUK.LabelText>
                                    Enter your email address
                                </GovUK.LabelText>
                                {errors?.email && (
                                    <GovUK.ErrorText>
                                        {errors.email}
                                    </GovUK.ErrorText>
                                )}
                                <GovUK.Input
                                    name="email"
                                    style={{ width: '40%' }}
                                    onChange={(e: any) =>
                                        setEmail(e.target.value)
                                    }
                                    value={email}
                                    error={!!errors?.email}
                                />
                            </GovUK.Label>
                            <GovUK.Label mb={6} error={!!errors?.password}>
                                <GovUK.LabelText>
                                    Enter your password
                                </GovUK.LabelText>
                                {errors?.password && (
                                    <GovUK.ErrorText>
                                        {errors.password}
                                    </GovUK.ErrorText>
                                )}
                                <GovUK.Input
                                    name="password"
                                    style={{ width: '40%' }}
                                    type="password"
                                    onChange={(e: any) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                    error={!!errors?.password}
                                />
                            </GovUK.Label>
                        </GovUK.Fieldset>
                        <GovUK.Button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            Login
                        </GovUK.Button>
                    </GovUK.LoadingBox>
                )}
            </Layout>
        </>
    );
};

export default LoginPage;
