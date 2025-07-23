package com.hanzama.mental_health_app.repository;

import com.hanzama.mental_health_app.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface untuk entitas User.
 * Menyediakan operasi CRUD standar dan method custom untuk pencarian berdasarkan email.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Mencari pengguna berdasarkan alamat email.
     * 
     * @param email alamat email pengguna
     * @return Optional yang berisi User jika ditemukan, atau empty jika tidak ditemukan
     */
    Optional<User> findByEmail(String email);
}
