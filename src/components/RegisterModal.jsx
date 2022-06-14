import React from 'react';
import { useForm, FormProvider } from "react-hook-form";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    FormControl,
    Input,
    Heading
} from '@chakra-ui/react'

export const RegisterModal = ({handleRegister, isOpen, onClose}) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} size='lg'>
            <ModalOverlay />
            <ModalContent>
                <ModalBody textAlign='center' p='40px 0' bg='#F7FAFC' borderRadius='15px'>
                    <Heading mb='40px' color='#1A365D'>Cadastro</Heading>
                    <FormProvider>
                        <form onSubmit={handleSubmit(handleRegister)}>
                            <FormControl id='register'>
                                <Input 
                                    mb='20px'
                                    w='50%'
                                    id='username'
                                    type='text'
                                    placeholder='username'
                                    {...register("username", {
                                        required: "campo obrigatório *",
                                    })}
                                />
                                <br/>
                                <Button
                                    className='btn-login'
                                    bg='#2B6CB0'
                                    color='#ffff'
                                    type='submit'
                                    onClick={onClose}
                                    _hover={{
                                        background: '#1A365D'
                                    }}
                                >
                                    Cadastrar
                                </Button>
                            </FormControl>
                        </form>
                    </FormProvider>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}