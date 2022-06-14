import React from 'react';
import { useForm, FormProvider } from "react-hook-form";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    FormControl,
    Input,
    Heading
} from '@chakra-ui/react'

export const TaskModal = ({handleSave, isOpen, onClose, headingTitle, title, description, id}) => {
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
                    <Heading mb='40px' color='#1A365D'>{headingTitle}</Heading>
                    <FormProvider>
                        <form onSubmit={handleSubmit(handleSave)}>
                            <FormControl id='register'>
                                <Input 
                                    mb='20px'
                                    w='50%'
                                    id='title'
                                    type='text'
                                    defaultValue={title || ''}
                                    placeholder='título'
                                    {...register("title", {
                                        required: "campo obrigatório *",
                                    })}
                                />
                                <br/>
                                <Input 
                                    mb='20px'
                                    w='50%'
                                    id='description'
                                    defaultValue={description || ''}
                                    type='text'
                                    placeholder='descrição'
                                    {...register("description", {
                                        required: "campo obrigatório *",
                                    })}
                                />
                                <Input value={id || ''} id={id} {...register('id')} display='none'/>
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
                                    Salvar
                                </Button>
                            </FormControl>
                        </form>
                    </FormProvider>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}