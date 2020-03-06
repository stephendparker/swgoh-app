package com.strange.swgoh.swgohapp.data.dto;

public class KeyValueDto {

    String key;
    Object value;

    public String getKey() {
        return key;
    }

    public Object getValue() {
        return value;
    }

    public KeyValueDto(String key, Object value) {
        this.key = key;
        this.value = value;
    }
}
