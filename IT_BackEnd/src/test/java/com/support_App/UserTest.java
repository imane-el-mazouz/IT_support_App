package com.support_App;

import com.support_App.dto.UserDTO;
import com.support_App.enums.Role;
import com.support_App.exception.UserNotFoundException;
import com.support_App.model.User;
import com.support_App.model.UserU;
import com.support_App.repository.UserRepository;
import com.support_App.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class UserTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private UserU userTest;

    @BeforeEach
    void setUp() {
        userTest = new UserU(); // Using UserU
        userTest.setId(1L);
        userTest.setEmail("user@example.com");
        userTest.setPassword("1234");
        userTest.setName("User");
        userTest.setRole(Role.UserU); // Ensure Role.UserU is valid
    }

    @Test
    void testNoArgConstructor() {
        UserU newUser = new UserU(); // Using UserU
        assertNotNull(newUser);
    }

//    @Test
//    void testSaveUser() {
//        when(passwordEncoder.encode(userTest.getPassword())).thenReturn("encodedUserPassword");
//        when(userRepository.save(any(UserU.class))).thenReturn(userTest);
//
//        UserDTO savedUserDTO = userService.addUserU(userTest);
//
//        assertNotNull(savedUserDTO);
//        assertEquals("encodedUserPassword", savedUserDTO.getPassword());
//        verify(userRepository, times(1)).save(any(UserU.class));
//    }
//
//    @Test
//    void testUpdateUser_UserNotFound() {
//        when(userRepository.findById(userTest.getId())).thenReturn(Optional.empty());
//
//        assertThrows(UserNotFoundException.class, () -> {
//            userService.updateUser(userTest, userTest.getId());
//        });
//    }
//
//    @Test
//    void testUpdateUser_UserFound() {
//        when(userRepository.findById(userTest.getId())).thenReturn(Optional.of(userTest));
//        when(userRepository.save(any(UserU.class))).thenReturn(userTest);
//        UserDTO updatedUserDTO = userService.updateUser(userTest, userTest.getId());
//        assertNotNull(updatedUserDTO);
//        assertEquals(userTest.getName(), updatedUserDTO.getName());
//        assertEquals(userTest.getEmail(), updatedUserDTO.getEmail());
//        verify(userRepository, times(1)).save(any(UserU.class)); // Changed to UserU
//    }

    @Test
    void testDeleteUser() {
        when(userRepository.existsById(userTest.getId())).thenReturn(true);
        doNothing().when(userRepository).deleteById(userTest.getId());

        userService.deleteUser(userTest.getId());

        verify(userRepository, times(1)).deleteById(userTest.getId());
    }

    @Test
    void testGetAllUsers() {
        when(userRepository.findAll()).thenReturn(List.of(userTest));

        List<User> users = userService.getAllUsers();

        assertNotNull(users);
        assertFalse(users.isEmpty());
        assertEquals(1, users.size());
    }
    @Test
    void testGetUserById() {
        when(userRepository.findById(userTest.getId())).thenReturn(Optional.of(userTest));

        User user = userService.getUserById(userTest.getId());

        assertNotNull(user);
        assertEquals(userTest.getId(), user.getId());
    }
}
