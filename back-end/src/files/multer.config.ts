import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import { diskStorage } from 'multer';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  // Trả về đường dẫn gốc của dự án
  getRootPath = () => {
    return process.cwd();
  };

  // Kiểm tra và tạo thư mục nếu chưa tồn tại
  ensureExists = (targetDirectory: string) => {
    try {
      fs.mkdirSync(targetDirectory, { recursive: true });
      console.log('Directory successfully created, or it already exists.');
    } catch (error: any) {
      switch (error.code) {
        case 'EEXIST':
          // Thư mục đã tồn tại nhưng không phải là một thư mục hợp lệ
          break;
        case 'ENOTDIR':
          // Có một file trùng tên với thư mục đang được tạo
          break;
        default:
          // Các lỗi khác (ví dụ: quyền bị từ chối)
          console.error(error);
          break;
      }
    }
  };

  // Cấu hình Multer
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        // Cấu hình đường dẫn lưu file
        destination: (req, file, cb) => {
          const folder = req?.headers?.folder_type ?? 'default'; // Lấy folder từ header hoặc mặc định là "default"
          const targetPath = path.join(
            this.getRootPath(),
            `public/images/${folder}`,
          );
          this.ensureExists(targetPath); // Đảm bảo thư mục tồn tại
          cb(null, targetPath); // Trả về đường dẫn lưu file
        },
        // Cấu hình tên file
        filename: (req, file, cb) => {
          let extName = path.extname(file.originalname); // Lấy phần mở rộng của file
          let baseName = path.basename(file.originalname, extName); // Lấy tên file không bao gồm phần mở rộng
          let finalName = `${baseName}-${Date.now()}${extName}`; // Tạo tên file mới với timestamp
          cb(null, finalName); // Trả về tên file
        },
      }),
    };
  }
}
