package com.app.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
public class Category {
    private String id;

    private String group;

    private String title;

    private List<Skill> skills;

    private String description;

    private String[] tags;



}
