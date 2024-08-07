package com.support_App;

import com.support_App.enums.Role;
import com.support_App.exception.UserNotFoundException;
import com.support_App.model.Admin;
import com.support_App.model.User;
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

    private Admin adminTest;

    @BeforeEach
    void setUp() {
        adminTest = new Admin();
        adminTest.setId(1L);
        adminTest.setEmail("admin@example.com");
        adminTest.setPassword("1234");
        adminTest.setName("Admin");
        adminTest.setRole(Role.Admin);
    }
    @Test
    void testNoArgConstructor() {
        Admin newAdmin = new Admin();
        assertNotNull(newAdmin);
    }
//    @Test
//    void testLoadUserByUsername_UserNotFound() {
//        when(userRepository.findByEmail(adminTest.getEmail())).thenReturn(null);
//
//        assertThrows(UsernameNotFoundException.class, () -> {
//            userService.loadUserByUsername(adminTest.getEmail());
//        });
//    }

    @Test
    void testLoadUserByUsername_UserFound() {
        when(userRepository.findByEmail(adminTest.getEmail())).thenReturn(adminTest);

        var userDetails = userService.loadUserByUsername(adminTest.getEmail());

        assertNotNull(userDetails);
        assertEquals(adminTest.getEmail(), userDetails.getUsername());
        assertEquals(adminTest.getPassword(), userDetails.getPassword());
        assertTrue(userDetails.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_" + adminTest.getRole().name())));
    }

    @Test
    void testSaveUser() {
        when(passwordEncoder.encode(adminTest.getPassword())).thenReturn("encodedAdminPassword");
        when(userRepository.save(any(User.class))).thenReturn(adminTest);

        User savedUser = userService.saveUser(adminTest);

        assertNotNull(savedUser);
        assertEquals("encodedAdminPassword", savedUser.getPassword());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testUpdateUser_UserNotFound() {
        when(userRepository.findById(adminTest.getId())).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> {
            userService.updateUser(adminTest, adminTest.getId());
        });
    }

    @Test
    void testUpdateUser_UserFound() {
        when(userRepository.findById(adminTest.getId())).thenReturn(Optional.of(adminTest));
        when(userRepository.save(any(User.class))).thenReturn(adminTest);

        User updatedUser = userService.updateUser(adminTest, adminTest.getId());

        assertNotNull(updatedUser);
        assertEquals(adminTest.getName(), updatedUser.getName());
        assertEquals(adminTest.getEmail(), updatedUser.getPassword());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testDeleteUser_UserNotFound() {
        when(userRepository.existsById(adminTest.getId())).thenReturn(false);

        assertThrows(RuntimeException.class, () -> {
            userService.deleteUser(adminTest.getId());
        });
    }

    @Test
    void testDeleteUser_UserFound() {
        when(userRepository.existsById(adminTest.getId())).thenReturn(true);
        doNothing().when(userRepository).deleteById(adminTest.getId());

        userService.deleteUser(adminTest.getId());

        verify(userRepository, times(1)).deleteById(adminTest.getId());
    }

    @Test
    void testGetAllUsers() {
        when(userRepository.findAll()).thenReturn(List.of(adminTest));

        List<User> users = userService.getAllUsers();

        assertNotNull(users);
        assertFalse(users.isEmpty());
        assertEquals(1, users.size());
    }

    @Test
    void testGetUserById_UserNotFound() {
        when(userRepository.findById(adminTest.getId())).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> {
            userService.getUserById(adminTest.getId());
        });
    }

    @Test
    void testGetUserById_UserFound() {
        when(userRepository.findById(adminTest.getId())).thenReturn(Optional.of(adminTest));

        User user = userService.getUserById(adminTest.getId());

        assertNotNull(user);
        assertEquals(adminTest.getId(), user.getId());
    }
}
