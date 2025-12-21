
import zipfile
import shutil
import os
from pathlib import Path

def extract_dataset():
    zip_path = Path(r"C:\Users\Yash\Downloads\archive.zip")
    target_dir = Path(r"D:/Projects/CropGuard/backend/dataset/PlantVillage")
    
    print(f"📂 Extracting from: {zip_path}")
    print(f"📂 Target: {target_dir}")
    
    if not zip_path.exists():
        print("❌ Zip file not found!")
        return

    # Clean target if exists
    if target_dir.exists():
        print("🧹 Cleaning existing folder...")
        shutil.rmtree(target_dir)
    target_dir.mkdir(parents=True, exist_ok=True)
    
    print("⏳ Unzipping (this may take a few minutes)...")
    
    try:
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            # Get list of files
            file_list = zip_ref.namelist()
            
            # Find the root folders we want 'train' and 'valid'
            # The structure might be:
            # archive/New Plant.../train/...
            # or just train/...
            
            # Helper to find where 'train' starts
            train_prefix = ""
            for f in file_list:
                if "train/" in f and not f.endswith("/"):
                    # Found a file inside train
                    # "New Plant Diseases Dataset(Augmented)/New Plant Diseases Dataset(Augmented)/train/Apple___Apple_scab/..."
                    parts = f.split("train/")
                    train_prefix = parts[0] + "train/"
                    break
            
            valid_prefix = train_prefix.replace("train/", "valid/")
            
            print(f"🔍 Found data prefix: {train_prefix}")

            # Extract only train and valid files, flattening the path
            for member in file_list:
                if member.startswith(train_prefix) or member.startswith(valid_prefix):
                    # Remove the prefix from the path to flatten it
                    if member.startswith(train_prefix):
                        rel_path = member[len(train_prefix):] # e.g. Apple___Apple_scab/image.jpg
                        final_target = target_dir / "train" / rel_path
                    else:
                        rel_path = member[len(valid_prefix):]
                        final_target = target_dir / "valid" / rel_path
                    
                    # Skip if it's just a folder entry
                    if member.endswith("/"):
                        continue
                        
                    # Create parent dir
                    final_target.parent.mkdir(parents=True, exist_ok=True)
                    
                    # extract
                    try:
                        with zip_ref.open(member) as source, open(final_target, "wb") as target:
                            shutil.copyfileobj(source, target)
                    except Exception as e:
                        print(f"⚠️ Failed to extract {member}: {e}")

        print("✅ Extraction Complete!")
        print(f"Train folder: {target_dir / 'train'}")
        
    except Exception as e:
        print(f"❌ Extraction failed: {e}")

if __name__ == "__main__":
    extract_dataset()
