package com.chatapp;

import com.chatapp.R;

import android.graphics.Color;
import android.view.View;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback;
import com.facebook.react.modules.core.PermissionListener;

public class MainActivity extends com.reactnativenavigation.controllers.SplashActivity implements OnImagePickerPermissionsCallback {
    private PermissionListener listener;
    @Override
    public int getSplashLayout() {
        return R.layout.splash;
    }
    @Override
    public void setPermissionListener(PermissionListener listener){
        this.listener = listener;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults){
        if (listener != null){
          listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
}
