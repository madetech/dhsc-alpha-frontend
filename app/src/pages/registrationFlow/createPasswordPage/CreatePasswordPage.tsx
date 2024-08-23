import React, { useCallback, useState } from 'react';
import * as GovUK from 'govuk-react';
import Layout from '../../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';

const validatePassword: (value?: string) => string | undefined = (value) =>
    value ? undefined : 'Please enter a password';

function isNotEmpty(obj: any) {
    return Object.keys(obj).some((key) => obj[key]?.length > 0);
}

const CreatePasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState<{
        password?: string;
        confirmPassword?: string;
    }>({});

    const validateConfirmPassword = (value?: string): string | undefined => {
        if (password) {
            if (!value) {
                return 'Please confirm password';
            }

            if (value !== undefined && value !== password) {
                return 'Passwords do not match';
            }
        }

        return undefined;
    };

    const handleSubmit = useCallback(() => {
        if (isSubmitting) return;

        const newErrors = {
            password: validatePassword(password),
            confirmPassword: validateConfirmPassword(confirmPassword),
        };

        if (isNotEmpty(newErrors)) {
            setErrors(newErrors);
        } else {
            setIsSubmitting(true);
            setTimeout(() => {
                setErrors({
                    password: undefined,
                    confirmPassword: undefined,
                });
                setHasSubmitted(true);
                setIsSubmitting(false);
            }, 1000);
            navigate('/registration/account-conformation');
        }
    }, [isSubmitting, password, confirmPassword]);

    return (
        <>
            <Layout>
                <GovUK.H2>Create a password</GovUK.H2>
                {!hasSubmitted && (
                    <GovUK.LoadingBox loading={isSubmitting}>
                        <GovUK.Fieldset>
                            <GovUK.Label mb={6} error={!!errors?.password}>
                                <GovUK.LabelText>Password</GovUK.LabelText>
                                <GovUK.HintText>
                                    Your password needs to be 12 characters or
                                    more.
                                </GovUK.HintText>
                                {errors?.password && (
                                    <GovUK.ErrorText>
                                        {errors.password}
                                    </GovUK.ErrorText>
                                )}
                                <GovUK.Input
                                    name="password"
                                    type="password"
                                    style={{ width: '40%' }}
                                    onChange={(e: any) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                    error={!!errors?.password}
                                />
                            </GovUK.Label>
                            <GovUK.Label
                                mb={6}
                                error={!!errors?.confirmPassword}
                            >
                                <GovUK.LabelText>
                                    Confirm password
                                </GovUK.LabelText>
                                {errors?.confirmPassword && (
                                    <GovUK.ErrorText>
                                        {errors.confirmPassword}
                                    </GovUK.ErrorText>
                                )}
                                <GovUK.Input
                                    name="confirmPassword"
                                    style={{ width: '40%' }}
                                    type="password"
                                    onChange={(e: any) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    value={confirmPassword}
                                    error={!!errors?.confirmPassword}
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

export default CreatePasswordPage;
